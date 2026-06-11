function LoadingSpinner() {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <div className="loader">
        <div className="loader-inner ball-clip-rotate">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
