import {
    SiPython,
    SiJavascript,
    SiTypescript,
    SiGo,
    SiDjango,
    SiFlask,
    SiFastapi,
    SiNodedotjs,
    SiReact,
    SiRedux,
    SiNextdotjs,
    SiTailwindcss,
    SiAmazon,
    SiGooglecloud,
    SiDocker,
    SiKubernetes,
    SiPostgresql,
    SiMongodb,
    SiFirebase,
    SiExpress,
    SiMysql,
    SiSocketdotio,
    SiStripe,
    SiGithub,
    SiCloudflare
} from 'react-icons/si';

const TechBanner = () => {
    const techIcons = [
        { Icon: SiPython, color: '#3776AB' },
        { Icon: SiJavascript, color: '#F7DF1E' },
        { Icon: SiTypescript, color: '#3178C6' },
        { Icon: SiGo, color: '#00ADD8' },
        { Icon: SiDjango, color: '#44B78B' },
        { Icon: SiFlask, color: '#6B7280' },
        { Icon: SiFastapi, color: '#009688' },
        { Icon: SiNodedotjs, color: '#339933' },
        { Icon: SiExpress, color: '#6B7280' },
        { Icon: SiReact, color: '#61DAFB' },
        { Icon: SiRedux, color: '#764ABC' },
        { Icon: SiNextdotjs, color: '#6B7280' },
        { Icon: SiTailwindcss, color: '#06B6D4' },
        { Icon: SiAmazon, color: '#FF9900' },
        { Icon: SiGooglecloud, color: '#4285F4' },
        { Icon: SiFirebase, color: '#FFCA28' },
        { Icon: SiDocker, color: '#2496ED' },
        { Icon: SiKubernetes, color: '#326CE5' },
        { Icon: SiCloudflare, color: '#F38020' },
        { Icon: SiGithub, color: '#6B7280' },
        { Icon: SiPostgresql, color: '#4169E1' },
        { Icon: SiMysql, color: '#4479A1' },
        { Icon: SiMongodb, color: '#47A248' },
        { Icon: SiSocketdotio, color: '#6B7280' },
        { Icon: SiStripe, color: '#008CDD' },
    ];

    return (
        <div className="mb-8 flex justify-center">
            <div className="w-1/2 relative">
                <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}</style>

                {/* Gradient fade on edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <div className="overflow-hidden">
                    <div className="flex animate-[scroll_30s_linear_infinite] hover:[animation-play-state:paused]">
                        {/* First set of icons */}
                        <div className="flex gap-8 px-4 items-center min-w-max">
                            {techIcons.map((tech, index) => (
                                <tech.Icon
                                    key={index}
                                    className="w-10 h-10 transition-colors cursor-pointer"
                                    style={{ color: '#6B7280' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = tech.color}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                                />
                            ))}
                        </div>

                        {/* Duplicate set for seamless loop */}
                        <div className="flex gap-8 px-4 items-center min-w-max">
                            {techIcons.map((tech, index) => (
                                <tech.Icon
                                    key={`duplicate-${index}`}
                                    className="w-10 h-10 transition-colors cursor-pointer"
                                    style={{ color: '#6B7280' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = tech.color}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechBanner;