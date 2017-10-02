export interface Project {
  id?: string;
  name: string;
  desc?: string;
  coverImg: string;
  taskLists?: string[]; // 列表的ID
  members?: string[]; // 成员ID
}