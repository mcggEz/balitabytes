import Footer from "./components/Footer";

import Navbar from "./components/Navbar";   

type NewsItem = {
  _id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

async function getNews(): Promise<NewsItem[]> {
  const response = await fetch("http://localhost:3000/api/news");
  const newsItems: NewsItem[] = await response.json();
  return newsItems;
}

export default async function Home() {
  const newsItems = await getNews();
  
  return (
    <>
    <Navbar />
      <div className="flex flex-col gap-2 justify-center items-center">

        <div className="text-sm text-gray-500 pt-5">Today's date is {new Date().toLocaleDateString()}</div>
        <input type="date" />
        <div className="flex gap-2">
          <input className="border-2 border-gray-300 rounded-md p-2" type="text" placeholder="So what news do you want to hear about" />
          
          <button className="bg-blue-500 text-white p-2 rounded-md">Search</button>
        </div>
      </div>
      {/* news component */}
      <div className="p-5 flex gap-2 h-screen">
        {newsItems.map((newsItem) => (
          <div 
            key={newsItem._id} 
            className="bg-blue-200 p-5 h-70 w-70 rounded-md hover:bg-blue-300"
          >
            <div>Title: {newsItem.title}</div>
            <div>Description: {newsItem.description}</div>
            <div>Image: {newsItem.imageUrl}</div>
            <div><img src={newsItem.imageUrl} alt={newsItem.title} /></div>
            <div>Reference: <a href={newsItem.link}>{newsItem.link}</a></div>
          </div>  
        ))}
      </div>
      <Footer />
    </>
  );
}
