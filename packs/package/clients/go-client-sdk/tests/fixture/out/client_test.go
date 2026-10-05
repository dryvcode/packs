package dryvclient

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"
)

func testClient(t *testing.T, handler http.HandlerFunc) *Client {
	t.Helper()
	server := httptest.NewServer(handler)
	t.Cleanup(server.Close)
	return NewClient(server.URL)
}

func TestCreateUserSendsSchemaInputAsJSONBody(t *testing.T) {
	client := testClient(t, func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			t.Fatalf("method = %s, want POST", r.Method)
		}
		if r.URL.Path != "/users" {
			t.Fatalf("path = %s, want /users", r.URL.Path)
		}
		if got := r.Header.Get("Content-Type"); got != "application/json" {
			t.Fatalf("content-type = %q, want application/json", got)
		}

		var input CreateUserRequest
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			t.Fatal(err)
		}
		if input.DisplayName != "Ada" {
			t.Fatalf("displayName = %q, want Ada", input.DisplayName)
		}
		if input.ExternalCustomerId != "customer-1" {
			t.Fatalf("externalCustomerId = %q, want customer-1", input.ExternalCustomerId)
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		_, _ = w.Write([]byte(`{"id":"user-1","externalCustomerId":"customer-1","displayName":"Ada","status":"active","createdAt":"2026-10-05T00:00:00Z"}`))
	})

	result, err := CreateUser(context.Background(), client, CreateUserRequest{
		ExternalCustomerId: "customer-1",
		DisplayName:        "Ada",
	})
	if err != nil {
		t.Fatal(err)
	}
	if result.Id != "user-1" {
		t.Fatalf("id = %q, want user-1", result.Id)
	}
}

func TestGetUserEscapesPathParameters(t *testing.T) {
	client := testClient(t, func(w http.ResponseWriter, r *http.Request) {
		if got := r.URL.EscapedPath(); got != "/users/4%202" {
			t.Fatalf("escaped path = %q, want /users/4%%202", got)
		}
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"id":"4 2","externalCustomerId":"customer-1","displayName":"Ada","status":"active","createdAt":"2026-10-05T00:00:00Z"}`))
	})

	result, err := GetUser(context.Background(), client, GetUserInput{Id: "4 2"})
	if err != nil {
		t.Fatal(err)
	}
	if result.Id != "4 2" {
		t.Fatalf("id = %q, want 4 2", result.Id)
	}
}

func TestSearchUsersBindsQueryHeaderAndCookie(t *testing.T) {
	client := testClient(t, func(w http.ResponseWriter, r *http.Request) {
		if got := r.URL.Query().Get("status"); got != "active" {
			t.Fatalf("status query = %q, want active", got)
		}
		if got := r.URL.Query().Get("limit"); got != "25" {
			t.Fatalf("limit query = %q, want 25", got)
		}
		if got := r.Header.Get("X-Trace-Id"); got != "trace-1" {
			t.Fatalf("X-Trace-Id = %q, want trace-1", got)
		}
		cookie, err := r.Cookie("session")
		if err != nil {
			t.Fatal(err)
		}
		if cookie.Value != "session-1" {
			t.Fatalf("session cookie = %q, want session-1", cookie.Value)
		}

		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"id":"user-1","externalCustomerId":"customer-1","displayName":"Ada","status":"active","createdAt":"2026-10-05T00:00:00Z"}`))
	})

	status := UserStatusActive
	limit := int64(25)
	traceID := "trace-1"
	session := "session-1"
	result, err := SearchUsers(context.Background(), client, SearchUsersInput{
		Status:  &status,
		Limit:   &limit,
		TraceId: &traceID,
		Session: &session,
	})
	if err != nil {
		t.Fatal(err)
	}
	if result.Id != "user-1" {
		t.Fatalf("id = %q, want user-1", result.Id)
	}
}

func TestHTTPFailuresReturnAPIError(t *testing.T) {
	client := testClient(t, func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		_, _ = w.Write([]byte(`{"message":"not found"}`))
	})

	_, err := ListUsers(context.Background(), client)
	if err == nil {
		t.Fatal("expected an error")
	}

	var apiErr *APIError
	if !errors.As(err, &apiErr) {
		t.Fatalf("error type = %T, want *APIError", err)
	}
	if apiErr.Status != http.StatusNotFound {
		t.Fatalf("status = %d, want 404", apiErr.Status)
	}
	if apiErr.Message != "not found" {
		t.Fatalf("message = %q, want not found", apiErr.Message)
	}
}
