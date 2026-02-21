export default function Map({ link }) {
  return (
    <div className="w-full h-130.5 border-t-12 border-[#6B0071] overflow-hidden">
      <iframe
        src={link}
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
