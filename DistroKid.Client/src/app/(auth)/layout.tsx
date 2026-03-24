import PixelBlast from "@/components/PixelBlast";
import ClickSpark from "@/components/ClickSpark";
import AuthGuard from "@/components/AuthGuard";
import { InfiniteSlider } from '@/components/ui/infinite-slider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <ClickSpark
          sparkColor='#000000'
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
      >
      <div className="flex flex-col w-screen h-screen overflow-hidden" style={{ position: 'relative', backgroundColor: '#ffffff' }}>
        <div 
            className="flex flex-row items-center justify-center w-full flex-1 overflow-hidden"
            style={{ position: 'relative', backgroundColor: '#ffffff' }}>
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
            <div className="w-1/2 h-full flex items-center justify-center overflow-hidden">
                {children}
            </div>
        </div>
        <div className="w-full h-24 flex items-center justify-center bg-white border-t border-gray-100 overflow-hidden flex-shrink-0">
          <InfiniteSlider gap={24} reverse>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>Spotify</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>Apple Music</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>YouTube</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>Tidal</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>Amazon Music</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>Deezer</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>SoundCloud</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>Pandora</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>Spotify</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>Apple Music</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>YouTube</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>Tidal</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>Amazon Music</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>Deezer</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>SoundCloud</div>
            <div className='h-16 w-24 flex items-center justify-center bg-gray-100 rounded text-xs font-semibold text-gray-600'>Pandora</div>
          </InfiniteSlider>
        </div>
      </div>
      </ClickSpark>
    </AuthGuard>
  );
}
