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
        { Icon: SiFlask, color: '#1C1B19' },
        { Icon: SiFastapi, color: '#009688' },
        { Icon: SiNodedotjs, color: '#339933' },
        { Icon: SiExpress, color: '#1C1B19' },
        { Icon: SiReact, color: '#61DAFB' },
        { Icon: SiRedux, color: '#764ABC' },
        { Icon: SiNextdotjs, color: '#1C1B19' },
        { Icon: SiTailwindcss, color: '#06B6D4' },
        { Icon: SiAmazon, color: '#FF9900' },
        { Icon: SiGooglecloud, color: '#4285F4' },
        { Icon: SiFirebase, color: '#FFCA28' },
        { Icon: SiDocker, color: '#2496ED' },
        { Icon: SiKubernetes, color: '#326CE5' },
        { Icon: SiCloudflare, color: '#F38020' },
        { Icon: SiGithub, color: '#1C1B19' },
        { Icon: SiPostgresql, color: '#4169E1' },
        { Icon: SiMysql, color: '#4479A1' },
        { Icon: SiMongodb, color: '#47A248' },
        { Icon: SiSocketdotio, color: '#1C1B19' },
        { Icon: SiStripe, color: '#008CDD' },
    ];

    return (
        <div className="mb-16 max-w-3xl mx-auto px-2">
            <p className="font-mono2 text-[10px] tracking-[0.2em] text-[#1C1B19]/45 text-center mb-6 uppercase">/&nbsp;THE&nbsp;TOOLKIT&nbsp;/</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-5 sm:gap-x-7">
                {techIcons.map((tech, index) => (
                    <tech.Icon
                        key={index}
                        className="w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-200 cursor-pointer"
                        style={{ color: '#1C1B19' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = tech.color}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#1C1B19'}
                    />
                ))}
            </div>
        </div>
    );
};

export default TechBanner;