interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}

interface JWTtypes {
  access: string;
  refresh: string;
}

interface UserType {
  UUid: string;
  username: string;
  email: string;
}

interface TaskType {
  id: number;
  title: string;
  priority: string;
  column_status: string;
  created_by: UserType;
  due_date: string;
}

export type { JWTtypes, ApiResponse, UserType, TaskType };
