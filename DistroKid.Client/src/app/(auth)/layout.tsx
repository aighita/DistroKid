import PixelBlast from "@/components/PixelBlast";
import ClickSpark from "@/components/ClickSpark";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClickSpark
        sparkColor='#000000'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
    >
    <div 
        className="flex flex-row items-center justify-center w-screen"
        style={{ height: '100vh', position: 'relative', backgroundColor: '#ffffff' }}>
        <div className="w-1/2 h-full relative p-16 rounded-l-lg overflow-hidden">
            <PixelBlast
                variant="square"
                pixelSize={4}
                color="#000000"
                patternScale={2.5}
                patternDensity={0.5}
                pixelSizeJitter={0}
                enableRipples={false}
                rippleSpeed={0.35}
                rippleThickness={0.15}
                rippleIntensityScale={1.2}
                liquid={false}
                liquidStrength={0.08}
                liquidRadius={1.5}
                liquidWobbleSpeed={4}
                speed={0.4}
                edgeFade={0}
            />
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
            {children}
        </div>
    </div>
    </ClickSpark>
  );
}
