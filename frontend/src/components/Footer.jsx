const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white  ">
      <div className="flex justify-between mb-2">
        <a href="#" className="hover:underline">Politique de confidentialité</a>
        <a href="#" className="hover:underline">droit dauteur</a>
        <a href="#" className="hover:underline">Conditions dutilisation</a>
      </div>
      <div className="flex justify-center">
      <img className="w-8 h-8 mr-2 ml-2" src="https://www.svgrepo.com/show/414876/book-education-library-2.svg" alt="logo"/>
      </div>
    </footer>
  );
};

export default Footer;
