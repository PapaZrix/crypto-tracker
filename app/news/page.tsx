import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Article = {
  link: string | undefined;
  title: string | undefined;
  imgSrc: string | undefined;
  content?: string;
  author?: string;
  date: string | undefined;
  imgHeight?: string;
  sizes?: ImageSource[];
};

type ImageSource = {
  media: string;
  srcset: string;
};

type Articles = [featured: Article[], trending: Article[], more: Article[]];

async function getArticles() {
  const res = await fetch('https://next-scraper-kappa.vercel.app/api/articles', {
    cache: 'no-store',
  });

  const data = await res.json();

  return data;
}

export default async function News() {
  const articles: Articles = await getArticles();

  return (
    <div className='w-full 2xl:w-11/12 3xl:w-9/12 mx-auto flex min-h-screen flex-col items-center p-2 md:p-4 xl:p-4'>
      <section className='w-full flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-2 2xl:gap-0 3xl:gap-0 xl:px-8 lg:py-2'>
        <div className='flex lg:flex-col h-full justify-center items-center mt-3'>
          <Link
            target='_blank'
            href={articles[0][0].link || ''}
            className='flex flex-col items-center gap-4 lg:gap-8 lg:block h-full lg:p-4'
          >
            <picture>
              {articles[0][0].sizes?.map((img, index) => (
                <React.Fragment key={index}>
                  <source media={img.media} srcSet={img.srcset} />
                </React.Fragment>
              ))}
              <img className='rounded-md' alt={articles[0][0].title} src={articles[0][0].imgSrc} />
            </picture>
            <div className='mb-2 xl:mb-0 w-full px-1 lg:mt-1 xl:mt-0 2xl:mt-2 '>
              <div className='flex-grow flex flex-col justify-between gap-4'>
                <div className='lg:max-w-[100%]'>
                  <h3 className='font-bold mb-3 text-2xl 2xl:text-3xl'>{articles[0][0].title}</h3>
                  <p className='text-md'>{articles[0][0].content}</p>
                </div>
                <div className='flex gap-8'>
                  <p className='text-xs font-semibold'>By {articles[0][0].author}</p>
                  <p className='text-xs'>{articles[0][0].date}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <hr className='border-b-[1px] lg:mb-2 border-orange-500 w-full lg:hidden mx-auto border-x-0 border-t-0 ' />
        <div className='lg:mt-4 2xl:mt-0 flex flex-col gap-2'>
          {articles[0].slice(1).map((article: Article, index: number) => (
            <>
              <Link target='_blank' href={article.link || ''} key={index}>
                <div className='my-2 p-2 lg:p-0 2xl:p-4 flex flex-col-reverse sm:flex-row items-center lg:items-start gap-3 2xl:gap-8'>
                  <div className='w-full sm:max-w-[80%] flex-grow flex flex-col justify-between gap-4'>
                    <div>
                      <p className='font-bold text-lg 2xl:text-xl mb-3'>{article.title}</p>
                      <p className='text-sm 2xl:text-md'>{article.content}</p>
                    </div>
                    <div className='flex gap-8'>
                      <p className='text-xs font-semibold'>By {article.author}</p>
                      <p className='text-xs'>{article.date}</p>
                    </div>
                  </div>
                  <div className='sm:max-w-[192px]'>
                    <picture>
                      {article.sizes?.map((img, index) => (
                        <React.Fragment key={index}>
                          <source media={img.media} srcSet={img.srcset} />
                        </React.Fragment>
                      ))}
                      <img className='rounded-md' src={article.imgSrc} alt={article.title} />
                    </picture>
                  </div>
                </div>
              </Link>
              <hr className='border-b-[1px] border-orange-500 w-full 2xl:w-[95%] mx-auto border-x-0 border-t-0 last:border-none' />
            </>
          ))}
        </div>
      </section>
      <hr className='border-b-[1px] border-orange-500 border-x-0 border-t-0 w-full mb-4 md:my-8' />
      <section className='flex flex-col items-center gap-4 py-4'>
        <h2 className='mb-4 md:mb-0 text-center sm:text-left w-full px-4 text-2xl font-semibold'>
          Trending
        </h2>
        <div className='flex flex-col sm:grid sm:grid-cols-2 xl:gap-2 mb-4'>
          {articles[1].slice(0, 4).map((article: Article, index: number) => (
            <Link className='w-full' target='_blank' key={index} href={article.link ?? ''}>
              <div className='flex'>
                <span className='mx-2 lg:ml-4 lg:mr-2 font-bold text-3xl leading-[65px] text-orange-500'>
                  {index + 1}
                </span>
                <div className='w-full p-2 lg:p-4 flex gap-2 sm:gap-8 lg:gap-4 xl:gap-8'>
                  <div className='w-[75%] sm:max-w-[65%] flex-grow flex flex-col justify-between gap-2'>
                    <div>
                      <p className='font-bold text-md lg:text-xl mb-3'>{article.title}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='text-xs'>{article.date}</p>
                    </div>
                  </div>
                  <div className='w-[80px] lg:w-full max-w-[192px] h-[80px] lg:h-[108px] relative'>
                    <Image
                      className='rounded-md'
                      src={article.imgSrc ?? ''}
                      alt={article.title ?? ''}
                      fill
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <hr className='border-b-[1px] border-orange-500 border-x-0 border-t-0 w-full' />
        <div className='flex flex-col sm:flex-row lg:gap-4 mt-8'>
          <div className='my-2 sm:my-0 w-full flex flex-col gap-2 lg:gap-4 sm:w-1/2'>
            <h2 className='text-2xl my-2 font-bold text-center'>Opinion</h2>
            {articles[1].slice(4, 7).map((article: Article, index: number) => (
              <Link className='w-full' target='_blank' key={index} href={article.link ?? ''}>
                <div className='w-full p-2 lg:p-4 flex gap-4 lg:gap-8'>
                  <div className='w-full sm:w-[80px] lg:w-full max-w-[192px] h-[80px] lg:h-[108px] relative'>
                    <Image
                      className='rounded-md'
                      src={article.imgSrc ?? ''}
                      alt={article.title ?? ''}
                      fill
                    />
                  </div>
                  <div className='w-full max-w-[75%] lg:max-w-[65%] flex-grow flex flex-col sm:justify-evenly lg:justify-between sm:gap-2'>
                    <div>
                      <p className='font-bold text-md lg:text-lg mb-3'>{article.title}</p>
                    </div>
                    <div className='text-xs flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-center'>
                      <p className='font-semibold'>By {article.author}</p>
                      <p>{article.date}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className='mt-8 mb-2 sm:my-0 w-full flex flex-col gap-2 lg:gap-4 sm:w-1/2'>
            <h2 className='text-2xl my-2 font-bold text-center'>News</h2>
            {articles[1].slice(7).map((article: Article, index: number) => (
              <Link className='w-full' target='_blank' key={index} href={article.link ?? ''}>
                <div className='w-full p-2 lg:p-4 flex gap-4 lg:gap-8'>
                  <div className='w-full sm:w-[80px] lg:w-full max-w-[192px] h-[80px] lg:h-[108px] relative'>
                    <Image
                      className='rounded-md'
                      src={article.imgSrc ?? ''}
                      alt={article.title ?? ''}
                      fill
                    />
                  </div>
                  <div className='w-full max-w-[75%] lg:max-w-[65%] flex-grow flex flex-col sm:justify-evenly lg:justify-between sm:gap-2'>
                    <div>
                      <p className='font-bold text-md lg:text-lg mb-3'>{article.title}</p>
                    </div>
                    <div className='text-xs flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-center'>
                      <p className='font-semibold'>By {article.author}</p>
                      <p>{article.date}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
