import { IPost } from '@/interfaces/IPost';

export const shufflePost = (posts: IPost[]) => {
  const shuffledPosts: IPost[] = [...posts];
  let currentIndex: number = shuffledPosts.length;
  let temporaryValue: IPost, randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = shuffledPosts[currentIndex];
    shuffledPosts[currentIndex] = shuffledPosts[randomIndex];
    shuffledPosts[randomIndex] = temporaryValue;
  }

  return shuffledPosts.slice(0, 10);
};
