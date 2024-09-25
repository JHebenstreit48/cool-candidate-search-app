// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    id: number | null;
    login: string | null;
    email: string | null;
    html_url: string | null;
    name: string | null;
    avatar_url: string | null;
    bio: string | null;
    company: string | null;
    location: string | null;
    blog: string | null;

}
