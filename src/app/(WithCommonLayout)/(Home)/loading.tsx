import RingLoader from "react-spinners/RingLoader";
const loadingPage = () => {
    return (
        <div>
        <RingLoader
      loading={true}
      size={200}
      color="#1d4ed8"
      aria-label="Loading Spinner"
      data-testid="loader"
      />
        </div>
    );
};

export default loadingPage;