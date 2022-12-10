export interface Album {
  id: string;
  name: string;
  userId: string;
  parentName: string;
  description: string;
  coverImageId: string;
  createdAt: Date;
}

export interface AlbumDto {
  name: string;
  parentName: string;
  description: string;
}
