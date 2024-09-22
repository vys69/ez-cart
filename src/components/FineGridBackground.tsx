export default function FineGridBackground() {
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none">
      <div 
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  )
}