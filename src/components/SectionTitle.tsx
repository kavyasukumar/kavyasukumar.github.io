export const SectionTitle = ({ outline, solid, isDark }) => (
  <div className="flex flex-col mb-12 lg:mb-20 relative">
    <h2 className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.8] tracking-tighter font-display uppercase relative z-10">
      <span className="block" style={{ 
        color: isDark ? '#ffffff' : '#0000ff',
        transition: 'color 0.5s ease'
      }}>
        {outline}
      </span>
      <span className="block text-transparent" style={{ 
        WebkitTextStroke: `1px ${isDark ? '#ffffff' : '#0000ff'}`,
        transition: 'all 0.5s ease'
      }}>
        {solid}
      </span>
    </h2>
  </div>
);