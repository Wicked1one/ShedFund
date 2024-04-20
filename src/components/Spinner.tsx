import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
	display: "block",
	margin: "0 auto",
	borderColor: "grey",
};

interface props {
	isloading: boolean;
}

function Spinner({ isloading }: props) {
	return (
		<div className="sweet-loading">
			<ClipLoader
				loading={isloading}
				cssOverride={override}
				size={50}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
}

export default Spinner;
