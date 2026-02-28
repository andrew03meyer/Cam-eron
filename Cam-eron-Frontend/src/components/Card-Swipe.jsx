import { useRef } from "react";

function CardSwipe({ question, onSwipe }) {
  console.log(question);
  const handleMouseDown = (e) => {
    dragRef.current.isDragging = true;
    dragRef.current.startX = e.touches[0].clientX;
  };

  const handleMove = (e) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.touches[0].clientX - dragRef.current.startX;

    dragRef.current.currentX = dx;
    cardRef.current.style.transform = `translateX(${dx}px) rotate(${dx * 0.1}deg)`;
  };

  const handleEnd = () => {
    dragRef.current.isDragging = false;
    const dx = dragRef.current.currentX;
    console.log(dx);
    if (Math.abs(dx) > 60) {
      // fly off screen
      const direction = dx > 0 ? "yes" : "no";
      cardRef.current.style.transform = `translateX(${dx > 0 ? 1000 : -1000}px)`;
      console.log(direction);
      onSwipe(direction);
      cardRef.current.style.transform = `translateX(0) rotate(0deg)`;
    } else {
      // snap back
      cardRef.current.style.transition = `transform 0.3s ease`;
      cardRef.current.style.transform = `translateX(0) rotate(0deg)`;
    }
  };

  const dragRef = useRef({ isDragging: false, startX: 0, currentX: 0 });
  const cardRef = useRef(null);

  return (
    <>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-2 h-max"
        onTouchStart={handleMouseDown}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        ref={cardRef}
      >
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{question}</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
      </div>
    </>
  );
}

export { CardSwipe };
