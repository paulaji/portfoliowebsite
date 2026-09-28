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
        { Icon: SiPython, name: 'Python' },
        { Icon: SiJavascript, name: 'JavaScript' },
        { Icon: SiTypescript, name: 'TypeScript' },
        { Icon: SiGo, name: 'Go' },
        { Icon: SiDjango, name: 'Django' },
        { Icon: SiFlask, name: 'Flask' },
        { Icon: SiFastapi, name: 'FastAPI' },
        { Icon: SiNodedotjs, name: 'Node.js' },
        { Icon: SiExpress, name: 'Express' },
        { Icon: SiReact, name: 'React' },
        { Icon: SiRedux, name: 'Redux' },
        { Icon: SiNextdotjs, name: 'Next.js' },
        { Icon: SiTailwindcss, name: 'Tailwind CSS' },
        { Icon: SiAmazon, name: 'AWS' },
        { Icon: SiGooglecloud, name: 'Google Cloud' },
        { Icon: SiFirebase, name: 'Firebase' },
        { Icon: SiDocker, name: 'Docker' },
        { Icon: SiKubernetes, name: 'Kubernetes' },
        { Icon: SiCloudflare, name: 'Cloudflare' },
        { Icon: SiGithub, name: 'GitHub' },
        { Icon: SiPostgresql, name: 'PostgreSQL' },
        { Icon: SiMysql, name: 'MySQL' },
        { Icon: SiMongodb, name: 'MongoDB' },
        { Icon: SiSocketdotio, name: 'Socket.IO' },
        { Icon: SiStripe, name: 'Stripe' },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-x-3.5 gap-y-3">
            {techIcons.map((tech) => (
                <tech.Icon key={tech.name} title={tech.name} aria-label={tech.name} className="w-5 h-5 opacity-80" />
            ))}
        </div>
    );
};

export default TechBanner;
