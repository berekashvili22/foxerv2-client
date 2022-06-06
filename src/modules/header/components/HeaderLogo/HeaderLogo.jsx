import Link from 'next/link';

const HeaderLogo = () => {
    return (
        <Link href={'/'}>
            <a className="flex justify-start mr-3 lg:mr-10 text-3xl md:text-4xl xl:text-5xl font-bold cursor-pointer">
                Foxer
            </a>
        </Link>
    );
};

export default HeaderLogo;
