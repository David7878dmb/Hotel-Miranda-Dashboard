
export interface User {
    id: string;  
    name: string;
    picture: string;
    joined: string;
    "job-desk": string;
    schedule: string[];
    contact: string;
    status: string;
  }
  
  export interface UsersState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  