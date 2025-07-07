function RightSection({ imageUrl, productName, productDesc }) {
    return ( 
       <div className="max-w-7xl mx-auto px-10 mt-16 mb-16">
      <div className="flex flex-wrap -mx-4 items-center">

        {/* Right: Award Image */}
        <div className="w-full md:w-1/2 px-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
            { productName }
          </h1>

          <p className="text-md font-medium text-gray-500 mb-6">
            { productDesc }
          </p>
        </div>

        {/* Left: Text and Features */}
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0 justify-items-center">
          <img src={ imageUrl } />
        </div>

      </div>
    </div>
     );
}

export default RightSection;