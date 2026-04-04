import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAndroid, faApple } from "@fortawesome/free-brands-svg-icons";

function HoverFlyIn({ logoUrl }) {
  const csgo = '/assets/images/game intro/logo/white/csgo_lg.png';
  const valorant = '/assets/images/game intro/logo/white/valor_lg.png';
  const wt = '/assets/images/game intro/logo/white/wt_lg.png';

  const url = [csgo, valorant, wt];
  // logoUrl = "../../assets/images/game intro/logo/white/csgo_lg.png";
  return (
    <div className=" relative px-5 pb-5 z-20 w-full flex justify-center items-center ">
      {/* Hidden content */}
      <div
        className=" transition-all transform
                               translate-y-8 opacity-0
                               group-hover:opacity-100
                               group-hover:translate-y-0"
        // class=" transition-all transform"
      >
        <div className="px-2 pb-2 flex flex-col justify-center items-center">
          <img src={url[logoUrl]} alt="logo" width={220} className="" />
          <hr
            className=" border-t border-gray-300"
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "20px",
              width: "100%",
              borderWidth: "1px",
            }}
          />
          <div className="text-xl text-center text-white">
            <a
              className="text-2xl px-4 h-full "
              href="https://play.google.com/store/apps/details?id=com.gaijingames.wtm&hl=en_US"
            >
              <FontAwesomeIcon
                className="hover:scale-125 duration-300 ease-in-out"
                icon={faAndroid}
              />
            </a>

            <a
              className="text-3xl px-4"
              href="https://apps.apple.com/us/app/war-thunder-mobile/id1577525428"
            >
              <FontAwesomeIcon
                className="hover:scale-125 duration-300 ease-in-out"
                icon={faApple}
              />
            </a>
          </div>

          <a
            href="https://www.mobirate.com/dead-ahead-zombie-warfare"
            className=" hover:bg-slate-100 hover:text-black duration-300 ease-in-out  mt-10 px-4 py-2 rounded-2xl right-0 text-sm text-white bg-green-600"
          >
            See more
          </a>
        </div>
      </div>
    </div>
  );
}

export default HoverFlyIn;
