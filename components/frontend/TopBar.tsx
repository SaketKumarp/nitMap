export default function TopBar() {
  return (
    <div className="absolute top-4 left-4 right-4 z-10">
      <div className="glass-dark rounded-2xl p-4 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-300">
            HEADS UP - NEXT CLASS IN 5 MINS
          </p>
          <p className="font-semibold">Data Structures in EC Seminar Room</p>
        </div>

        <button className="bg-blue-600 px-4 py-2 rounded-xl">Start Nav</button>
      </div>
    </div>
  );
}
