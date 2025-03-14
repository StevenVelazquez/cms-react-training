// types.ts

export interface ComicProps {
    comic: {
      id: number;
      title: string;
      issueNumber: number;
      thumbnail: {
        path: string;
        extension: string;
      };
      dates: { type: string; date: string }[];
      creators: { items: { role: string; name: string }[] };
    };
  }
  