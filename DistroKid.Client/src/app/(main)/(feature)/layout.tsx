import ClickSpark from "@/components/ClickSpark";
import StaggeredMenu from "@/components/StaggeredMenu";
import GradientText from "@/components/GradientText";

const menuItems = [
  { label: 'RELEASEs', ariaLabel: 'View your releases', link: '/releases' },
  { label: 'PLATFORMs', ariaLabel: 'View your platforms', link: '/platforms' },
  { label: 'MERCH & EVENTs', ariaLabel: 'View your merch and events', link: '/merch-and-events' }
];

const socialItems = [
  { label: 'Instagram', link: 'https://instagram.com' },
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'YouTube', link: 'https://youtube.com' },
  { label: 'Facebook', link: 'https://facebook.com' }
];

export default function FeatureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClickSpark
      sparkColor='#5227FF'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <StaggeredMenu
        position="right"
        logoUrl="/"
        logo={<GradientText
                colors={["#5227FF","#7C4DFF","#B19EEF"]}
                animationSpeed={4}
                showBorder={false}
                className="custom-class"
              >
                DistroKid
              </GradientText>}
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={false}
        menuButtonColor="#000000"
        openMenuButtonColor="#111111"
        changeMenuColorOnOpen={true}
        colors={['#5227FF', '#7C4DFF']}
        accentColor="#5227FF"
        isFixed={true}
        workingHours={[
          { day: 'Total Streams', hours: '2.4M' },
          { day: 'Followers', hours: '18.5K' },
          { day: 'Top Track', hours: '642K plays' }
        ]}
      />
      <main>
        {children}
      </main>
    </ClickSpark>
  );
}
