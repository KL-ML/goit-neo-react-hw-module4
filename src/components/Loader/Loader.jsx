import { ClipLoader } from 'react-spinners';

export default function Loader({ loading }) {
  return (
    <>
      <div>
        <ClipLoader
          color="orange"
          loading={loading}
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}
