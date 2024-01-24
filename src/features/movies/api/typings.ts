export type MoviesData = {
  page: {
    title: string;
    "total-content-items": string;
    "page-num-requested": string;
    "page-size-requested": string;
    "page-size-returned": string;
    "content-items": {
      content: Array<{
        name: string;
        "poster-image": string;
      }>;
    };
  };
};

export type MoviesDataProps = {
  page: number;
  onSuccess: (data: MoviesData) => void;
};
