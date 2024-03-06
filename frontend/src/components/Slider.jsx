import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const Slider = () => {
  return (
     <div className="flex flex-col justify-center min-h-[50vh] max-h-[50vh] lg:max-h-[10vh]">
      <Carousel
        showArrows={false}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={6100}
      >
        <div>
          <img src='https://e0.pxfuel.com/wallpapers/18/860/desktop-wallpaper-chainsawman-volume-cover-chainsaw-man-manga.jpg' alt='Image 1' />
          <div className="absolute bottom-0 text-white p-10">
            <h2 className="text-2xl font-semibold">Titre 1</h2>
            <p>Description image 1</p>
          </div>
        </div>

        <div>
          <img src='https://www.fredzone.org/wp-content/uploads/2023/04/Berserk-manga-Guts-cover.webp' alt='Image 2' />
          <div className="absolute bottom-0 text-white p-10">
            <h2 className="text-2xl font-semibold">Titre 2</h2>
            <p>Description de image 2</p>
          </div>
        </div>
        <div>
          <img src='https://e0.pxfuel.com/wallpapers/18/860/desktop-wallpaper-chainsawman-volume-cover-chainsaw-man-manga.jpg' alt='Image 2' />
          <div className="absolute bottom-0 text-white p-10">
            <h2 className="text-2xl font-semibold">Titre 3</h2>
            <p>Description de image 2</p>
          </div>
        </div>

        {/* Ajoutez plus d'images si nécessaire */}
      </Carousel>
    </div>
   );
};

export default Slider;
