export const AlertSvg = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        fill="#C73E59"
        fillOpacity="0.9"
      />
      <path
        d="M12.925 7.5L12.7625 13.4748H11.2376L11.0709 7.5H12.925ZM12 17.1414C11.725 17.1414 11.4889 17.0442 11.2917 16.8498C11.0945 16.6525 10.9973 16.4164 11.0001 16.1414C10.9973 15.8692 11.0945 15.6359 11.2917 15.4415C11.4889 15.247 11.725 15.1498 12 15.1498C12.2639 15.1498 12.4958 15.247 12.6958 15.4415C12.8958 15.6359 12.9972 15.8692 13 16.1414C12.9972 16.3248 12.9486 16.4928 12.8542 16.6456C12.7625 16.7956 12.6417 16.9164 12.4917 17.0081C12.3417 17.097 12.1778 17.1414 12 17.1414Z"
        fill="white"
      />
    </svg>
  );
};
