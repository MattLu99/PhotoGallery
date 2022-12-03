export interface Photo {
  id: string;
  name: string;
  albumId: string;
  description: string;
  takenAtTime: Date;
  takenAtLocation: string;
  imageData: string;
  uploadedAt: Date;
}
