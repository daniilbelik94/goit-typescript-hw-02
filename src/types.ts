export interface Image {
  id: string;
  alt_description: string;
  likes: number;
  links: { download: string };
  urls: {
    regular: string;
    small: string;
  };
  user: {
    name: string;
    instagram_username: string;
    location: string;
  };
}

export interface ModalImage {
  alt_description: string;
  likes: number;
  links: string;
  image: string;
  userName: string;
  instagram: string;
  location: string;
}
