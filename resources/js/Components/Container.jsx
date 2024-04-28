export default function Container({ className = '', ...props }) {
    return (
        <div className={'container mx-auto px-4 sm:px-6 lg:px-8 ' + className} {...props} />
    );
}
