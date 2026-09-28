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
        { Icon: SiFlask, color: '#FFFFFF' },
        { Icon: SiFastapi, color: '#009688' },
        { Icon: SiNodedotjs, color: '#339933' },
        { Icon: SiExpress, color: '#FFFFFF' },
        { Icon: SiReact, color: '#61DAFB' },
        { Icon: SiRedux, color: '#764ABC' },
        { Icon: SiNextdotjs, color: '#FFFFFF' },
        { Icon: SiTailwindcss, color: '#06B6D4' },
        { Icon: SiAmazon, color: '#FF9900' },
        { Icon: SiGooglecloud, color: '#4285F4' },
        { Icon: SiFirebase, color: '#FFCA28' },
        { Icon: SiDocker, color: '#2496ED' },
        { Icon: SiKubernetes, color: '#326CE5' },
        { Icon: SiCloudflare, color: '#F38020' },
        { Icon: SiGithub, color: '#FFFFFF' },
        { Icon: SiPostgresql, color: '#4169E1' },
        { Icon: SiMysql, color: '#4479A1' },
        { Icon: SiMongodb, color: '#47A248' },
        { Icon: SiSocketdotio, color: '#FFFFFF' },
        { Icon: SiStripe, color: '#008CDD' },
    ];

    return (
        <div className="mt-20 pt-10 border-t border-[var(--line)]">
            <div className="flex flex-wrap justify-between gap-x-6 gap-y-6">
                {techIcons.map((tech, index) => (
                    <tech.Icon
                        key={index}
                        className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-200"
                        style={{ color: '#3F3B38' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#D0161F'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#3F3B38'}
                    />
                ))}
            </div>
        </div>
    );
};

export default TechBanner;