export default function Map() {
  return (
    <div className="w-full h-130.5 border-t-12 border-[#6B0071] overflow-hidden">
      <iframe
        src="https://www.google.com/maps?q=51.8968159,-8.4703406&z=17&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
