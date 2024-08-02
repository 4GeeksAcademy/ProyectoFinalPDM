import datetime
import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]

def main():
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    try:
        service = build("calendar", "v3", credentials=creds)
        now = datetime.datetime.utcnow().isoformat() + "Z"
        print("Getting the upcoming 10 events")
        events_result = service.events().list(
            calendarId="primary", timeMin=now, maxResults=10, singleEvents=True, orderBy="startTime"
        ).execute()
        events = events_result.get("items", [])

        if not events:
            print("No upcoming events found.")
            return

        events_data = []
        for event in events:
            start = event["start"].get("dateTime", event["start"].get("date"))
            event_info = {
                "start": start,
                "summary": event["summary"]
            }
            events_data.append(event_info)
            print(start, event["summary"])
        return events_data

    except HttpError as error:
        print(f"An error occurred: {error}")

if __name__ == "__main__":
    main()
