export function QuickStayCard() {
    return (
      <>
        <a href="">
          <div class="card card-side rounded-sm md:bg-base-100 md:shadow-xl">
            <figure class="w-1/3 items-start">
              <img
                src="https://cdn1.ivivu.com/iVivu/2020/12/11/18/a2252ac5-cr-800x450.webp?o=jpg"
                alt="Hotel Picture"
                className="w-[150px] h-[150px] md:w-[450px] md:h-full object-cover"
              />
            </figure>
            <div class="card-body flex-1 p-0 px-4 md:p-7">
              <h2 class="card-title text-base md:text-xl">
                New World Saigon Hotel
              </h2>
              <p class="text-gray-500 text-sm md:text-base">
                <i class="fa-solid fa-location-dot"></i> Thuong Yen Cong
                Commune, Quang Ninh Province
              </p>
              <div class="card-actions">
                <button class="btn bg-transparent border-black border-[1.5px]">
                  <i class="fa-solid fa-hotel"></i> Stay
                </button>
              </div>
            </div>
          </div>
        </a>
      </>
    );
}

export function QuickExperienceCard() {
    return (
      <>
        <a href="">
          <div class="card card-side rounded-sm md:bg-base-100 md:shadow-xl">
            <figure class="w-1/3 items-start">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFahLVCi-x_78A2dW4_8zlZN57mdB9NzX6dLxcbXdGDg&s"
                alt="Experience Pic"
                className="w-[150px] h-[150px] md:w-[450px] md:h-full object-cover"
              />
            </figure>
            <div class="card-body flex-1 p-0 px-4 md:p-7">
              <h2 class="card-title text-base md:text-xl">Ho Chi Minh Trail</h2>
              <p class="text-gray-500 text-sm md:text-base">
                <i class="fa-solid fa-location-dot"></i> Ho Chi Minh City
              </p>
              <div class="card-actions">
                <button class="btn bg-transparent border-black border-[1.5px]">
                  <i class="fa-solid fa-parachute-box"></i> Experience
                </button>
              </div>
            </div>
          </div>
        </a>
      </>
    );
}