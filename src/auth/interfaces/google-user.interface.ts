export interface GoogleUser {
  provider: string;
  id: string;
  displayName: string;
  name: GoogleName;
  emails: GoogleEmail[];
}

interface GoogleName {
  familyName: string;
  givenName: string;
}

interface GoogleEmail {
  value: string;
}