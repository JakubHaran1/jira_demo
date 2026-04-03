export default interface TaskType {
  id: number;
  title: string;
  priority: string;
  created_by: {
    username: string;
  };
}
