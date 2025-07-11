import Menu from "./Menu";

const TopBar = () => {
  return (
    <>
      <div className="w-full h-[10vh] flex items-center shadow-[0px_0px_4px_2px_rgb(236,235,235)] box-border z-[9]">
        <div className="basis-[32%] h-full px-[20px] py-[10px] border-r border-r-[rgb(224,224,224)] box-border flex items-center justify-around">
          <div className="basis-[40%] flex items-center justify-evenly -z-10">
            <p className="text-[0.8rem] font-medium uppercase text-[#616161] whitespace-nowrap">NIFTY 50</p>
            <p className="text-[0.8rem] font-medium text-[#df4949]">{100.2} </p>
            <p className="text-[0.8rem] font-normal text-[#929292]"> </p>
          </div>
          <div className="basis-[40%] flex items-center justify-evenly">
            <p className="text-[0.8rem] font-medium uppercase text-[#616161] whitespace-nowrap">SENSEX</p>
            <p className="text-[0.8rem] font-medium text-[#df4949]">{100.2}</p>
            <p className="text-[0.8rem] font-normal text-[#929292]"></p>
          </div>
        </div>

        <Menu />
      </div>
    </>
  );
};

export default TopBar;
