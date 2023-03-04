import {iconURLfromCode} from "../services/weatherServices"
export default function FiveItems(props) {
  return (
    <div className="flex flex-col border-black p-4 pb-8">
      <h3 className="font-sans text-lg mb-4 text-center capitalize tracking-widest" key={props.title}>
        {props.title}
      </h3>
      <div className="flex justify-evenly items-center">
        {props.fiveItems.map((item) => {
            return (<div
              className="flex flex-col justify-center items-center gap-1"
              key={item.temp}
            >
              <img
                className="w-10 filter drop-shadow-md "
                src={iconURLfromCode(item.icon)}
                alt={item.icon}
              />
              <p className="p-0 m-0 font-sans font-light text-xs">{item.temp.toFixed()}°C</p>
              <p className="p-0 m-0 font-sans font-light text-sm first-letter:capitalize">
                {item.moment}
              </p>
            </div>
            )
        })}
      </div>
    </div>
  );
}
