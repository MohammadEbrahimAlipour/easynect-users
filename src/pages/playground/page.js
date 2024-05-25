import tw from "tailwind-styled-components";

const FAKE_PROFILE_URL =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const FAKE_COVER_URL =
  "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Page() {
  return (
    <Wrapper>
      <Cover>
        <CoverImage src={FAKE_COVER_URL} />
      </Cover>
      <Header>
        <ProfilePictureWrapper>
          <ProfilePicture src={FAKE_PROFILE_URL} />
        </ProfilePictureWrapper>
        <HeaderContent>
          <Texts>
            <FullName>سوزانا جوانسون</FullName>
            <Bio>برنامه نویس در شرکت راستا پردازان شرق</Bio>
          </Texts>
          <Actions>
            <Button>ذخیره‌ی مخاطب</Button>
            <ButtonOutlined>پوستن به لید</ButtonOutlined>
          </Actions>
        </HeaderContent>
      </Header>
    </Wrapper>
  );
}

const Wrapper = tw.div``;

const Cover = tw.div`
  bg-red-500
  w-screen
  h-[33.3333333vw]

  container:w-[414px]
  container:h-[138px]
`;

const CoverImage = tw.img`
  w-full
  h-full
  object-cover
`;

const Header = tw.div`
  -translate-y-4
  pe-4
  ps-1
  flex
  items-center
`;

const HeaderContent = tw.div`
  flex-1
  ps-2
  pt-6
`;

const Texts = tw.div`
  ps-2
`;

const ProfilePictureWrapper = tw.div`
  w-32
  h-32
  rounded-full
  border-4
  border-white
  overflow-hidden
`;

const ProfilePicture = tw.img`
  w-full
  h-full
  object-cover
`;

const FullName = tw.h4`
  text-gray-900
`;

const Bio = tw.p`
  text-xs
  text-gray-400
`;

const Actions = tw.div`
  flex
  gap-2
  mt-4
`;
const Button = tw.button`
  py-2
  px-3
  flex-1
  rounded-md
  bg-black
  text-white
  text-xs
  border-2
  border-black
`;

const ButtonOutlined = tw(Button)`
  bg-transparent
  text-black
`;
