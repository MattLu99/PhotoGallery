export interface Album {
  id: string;
  name: string;
  userId: string;
  parentName: string;
  description: string;
  createdAt: Date;
}

export interface AlbumDto {
  name: string;
  parentName: string;
  description: string;
}
