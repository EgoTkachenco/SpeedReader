import store from '../../store'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const Navigation = () => {
  const router = useRouter()
  return (
    <nav className="navigation">
      {LINKS.map((link) => (
        <Link href={link.pathname} key={link.name}>
          <button
            className={`navigation__link ${
              router.pathname === link.pathname ? 'active' : ''
            }`}
          >
            {link.icon()}
          </button>
        </Link>
      ))}
    </nav>
  )
}

export default Navigation

const HomeIcon = () => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_244_2302)">
      <path
        d="M15.6048 7.02207C15.6045 7.0217 15.6041 7.02133 15.6037 7.02096L9.10342 0.46816C8.82635 0.188718 8.4571 0.0339049 8.06367 0.0323155C7.67024 0.0307261 7.29975 0.182429 7.02031 0.459623L0.470697 6.95641C0.46849 6.9586 0.466284 6.96091 0.464078 6.9631C-0.109528 7.53537 -0.112317 8.46762 0.458483 9.04305C0.719263 9.30607 1.06447 9.4592 1.43416 9.47656C1.44916 9.47808 1.4643 9.47888 1.47956 9.47894L1.73969 9.47999L1.72028 14.2831C1.71644 15.2335 2.48663 16.0099 3.4373 16.0138L5.99075 16.0241C6.24954 16.0251 6.46034 15.8161 6.46139 15.5572L6.4766 11.7916C6.47835 11.3579 6.83256 11.0066 7.26627 11.0083L8.77236 11.0144C9.20608 11.0161 9.55743 11.3704 9.55568 11.8041L9.54047 15.5697C9.53942 15.8286 9.74841 16.0393 10.0073 16.0403L12.5608 16.0506C13.5114 16.0545 14.2879 15.2843 14.2917 14.3338L14.3111 9.53078L14.5523 9.53175C14.9456 9.53334 15.3161 9.38164 15.5957 9.10444C16.1717 8.53267 16.1757 7.59884 15.6048 7.02207Z"
        fill="url(#paint0_linear_244_2302)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_244_2302"
        x1="8.06357"
        y1="0.0323151"
        x2="7.99894"
        y2="16.0322"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B3B3B3" />
        <stop offset="1" stopColor="#BBBBBB" />
      </linearGradient>
      <clipPath id="clip0_244_2302">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(0.0644531) rotate(0.231464)"
        />
      </clipPath>
    </defs>
  </svg>
)

const CoursesIcon = () => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.0646973"
      width="7"
      height="7"
      rx="2"
      transform="rotate(0.231464 0.0646973 0)"
      fill="url(#paint0_linear_244_1982)"
    />
    <rect
      x="9.0647"
      y="0.036377"
      width="7"
      height="7"
      rx="2"
      transform="rotate(0.231464 9.0647 0.036377)"
      fill="url(#paint1_linear_244_1982)"
    />
    <rect
      x="0.0283203"
      y="8.99994"
      width="7"
      height="7"
      rx="2"
      transform="rotate(0.231464 0.0283203 8.99994)"
      fill="url(#paint2_linear_244_1982)"
    />
    <rect
      x="9.02832"
      y="9.03625"
      width="7"
      height="7"
      rx="2"
      transform="rotate(0.231464 9.02832 9.03625)"
      fill="url(#paint3_linear_244_1982)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_244_1982"
        x1="3.5647"
        y1="0"
        x2="3.5647"
        y2="7"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B3B3B3" />
        <stop offset="1" stopColor="#BBBBBB" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_244_1982"
        x1="12.5647"
        y1="0.036377"
        x2="12.5647"
        y2="7.03638"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B3B3B3" />
        <stop offset="1" stopColor="#BBBBBB" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_244_1982"
        x1="3.52832"
        y1="8.99994"
        x2="3.52832"
        y2="15.9999"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B3B3B3" />
        <stop offset="1" stopColor="#BBBBBB" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_244_1982"
        x1="12.5283"
        y1="9.03625"
        x2="12.5283"
        y2="16.0363"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B3B3B3" />
        <stop offset="1" stopColor="#BBBBBB" />
      </linearGradient>
    </defs>
  </svg>
)

const TrainingIcon = () => (
  <svg
    width="1.5rem"
    height="1.5rem"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_244_2317)">
      <path
        d="M12.0383 14.4502L6.07959 12.5898L6.07229 14.3964L6.0672 15.6567C6.06147 17.0745 8.72886 18.2349 12.0248 18.2482C15.3205 18.2615 17.9977 17.1227 18.0034 15.7049C18.0034 15.6937 17.9998 15.6825 17.9996 15.6716L18.0119 12.638L12.0383 14.4502Z"
        fill="url(#paint0_linear_244_2317)"
      />
      <path
        d="M2.05575 10.0589L4.18406 10.8299L4.36727 10.4416L5.15056 10.3782L5.26173 10.4948L4.58918 10.6515L4.49008 10.9409C4.48991 10.9409 2.95955 14.1074 3.17616 15.6603C3.17616 15.6603 4.12113 16.2292 5.07026 15.668L5.33903 11.4255L5.34045 11.0723L6.75117 10.76L6.65063 11.0048L5.59839 11.3423L6.08372 11.5179L12.0425 13.3783L18.016 11.5661L22.0556 10.1397L12.0712 6.25207L2.05575 10.0589Z"
        fill="url(#paint1_linear_244_2317)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_244_2317"
        x1="12.0477"
        y1="12.6139"
        x2="12.0249"
        y2="18.2482"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B3B3B3" />
        <stop offset="1" stopColor="#BBBBBB" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_244_2317"
        x1="12.0712"
        y1="6.25207"
        x2="12.032"
        y2="15.9472"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B3B3B3" />
        <stop offset="1" stopColor="#BBBBBB" />
      </linearGradient>
      <clipPath id="clip0_244_2317">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(2.08838 2.00806) rotate(0.231464)"
        />
      </clipPath>
    </defs>
  </svg>
)

const ProfileIcon = () => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_244_2326)">
      <path
        d="M7.91926 7.73905C8.97808 7.74332 9.89648 7.36727 10.6486 6.62104C11.4008 5.87493 11.7843 4.95985 11.7885 3.9009C11.7928 2.84232 11.4168 1.92405 10.6705 1.17164C9.9243 0.419601 9.0091 0.0361417 7.95039 0.0318647C6.89145 0.0275868 5.9733 0.40364 5.22113 1.14975C4.46897 1.89586 4.08539 2.81106 4.08111 3.86977C4.07683 4.92871 4.45301 5.84698 5.19924 6.59915C5.94547 7.35119 6.86068 7.73477 7.91926 7.73905Z"
        fill="url(#paint0_linear_244_2326)"
      />
      <path
        d="M14.6436 12.3622C14.6232 12.0503 14.5809 11.71 14.518 11.3507C14.4546 10.9886 14.3723 10.6462 14.2735 10.3332C14.1714 10.0096 14.0321 9.68999 13.8595 9.38351C13.6803 9.0654 13.4695 8.78818 13.2327 8.5598C12.985 8.32089 12.6813 8.12838 12.3298 7.98743C11.9796 7.84722 11.5911 7.77534 11.1752 7.77366C11.0118 7.773 10.8536 7.83938 10.5478 8.03675C10.3595 8.15843 10.1394 8.29914 9.89361 8.45476C9.68348 8.58746 9.39904 8.71143 9.04788 8.8233C8.70527 8.93263 8.35764 8.98738 8.01475 8.98599C7.67185 8.98461 7.32479 8.92705 6.98272 8.81495C6.63284 8.70038 6.34941 8.57411 6.1406 8.43972C5.89843 8.28359 5.67928 8.1411 5.48923 8.01619C5.18535 7.81635 5.02754 7.7487 4.86422 7.74804C4.4482 7.74636 4.05925 7.81522 3.70799 7.95272C3.35562 8.09058 3.05029 8.28063 2.80043 8.51778C2.56184 8.74436 2.34869 9.01974 2.16724 9.33627C1.9923 9.64135 1.85038 9.95975 1.74556 10.2827C1.64433 10.5949 1.55933 10.9365 1.49293 11.298C1.42715 11.6564 1.38207 11.9964 1.3592 12.3089C1.33673 12.6149 1.3247 12.9326 1.3234 13.2535C1.32003 14.0887 1.5828 14.7659 2.10434 15.2667C2.61943 15.7609 3.30262 16.0133 4.13464 16.0166L11.8387 16.0477C12.6707 16.0511 13.3556 15.8044 13.8748 15.3143C14.4005 14.8181 14.6687 14.1429 14.6721 13.3073C14.6733 12.985 14.6637 12.6669 14.6436 12.3622Z"
        fill="url(#paint1_linear_244_2326)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_244_2326"
        x1="7.95039"
        y1="0.0318647"
        x2="7.91926"
        y2="7.73905"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B3B3B3" />
        <stop offset="1" stopColor="#BBBBBB" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_244_2326"
        x1="8.02006"
        y1="7.76079"
        x2="7.98665"
        y2="16.0322"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B3B3B3" />
        <stop offset="1" stopColor="#BBBBBB" />
      </linearGradient>
      <clipPath id="clip0_244_2326">
        <rect
          width="15.9999"
          height="16"
          fill="white"
          transform="translate(0.0644531) rotate(0.231464)"
        />
      </clipPath>
    </defs>
  </svg>
)

const TestingIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1058_2145)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.24902 1C1.24902 0.447715 1.69674 0 2.24902 0H9.74902C10.0638 0 10.3602 0.148194 10.549 0.4L13.049 3.73333C13.1788 3.90643 13.249 4.11696 13.249 4.33333V8.25606C12.7799 8.09023 12.275 8 11.749 8C9.26374 8 7.24902 10.0147 7.24902 12.5C7.24902 13.4251 7.52816 14.285 8.0068 15H2.24902C1.69674 15 1.24902 14.5523 1.24902 14V1ZM9.74902 4C10.0252 4 10.249 4.22386 10.249 4.5C10.249 4.77614 10.0252 5 9.74902 5H9.24902C8.97288 5 8.74902 4.77614 8.74902 4.5C8.74902 4.22386 8.97288 4 9.24902 4H9.74902ZM10.249 7C10.249 6.72386 10.0252 6.5 9.74902 6.5H9.24902C8.97288 6.5 8.74902 6.72386 8.74902 7C8.74902 7.27614 8.97288 7.5 9.24902 7.5H9.74902C10.0252 7.5 10.249 7.27614 10.249 7ZM3.74902 4C3.47288 4 3.24902 4.22386 3.24902 4.5C3.24902 4.77614 3.47288 5 3.74902 5H6.24902C6.52517 5 6.74902 4.77614 6.74902 4.5C6.74902 4.22386 6.52517 4 6.24902 4H3.74902ZM3.24902 7C3.24902 6.72386 3.47288 6.5 3.74902 6.5H6.24902C6.52517 6.5 6.74902 6.72386 6.74902 7C6.74902 7.27614 6.52517 7.5 6.24902 7.5H3.74902C3.47288 7.5 3.24902 7.27614 3.24902 7ZM3.74902 9C3.47288 9 3.24902 9.22386 3.24902 9.5C3.24902 9.77614 3.47288 10 3.74902 10H6.24902C6.52517 10 6.74902 9.77614 6.74902 9.5C6.74902 9.22386 6.52517 9 6.24902 9H3.74902Z"
        fill="#B7B7B7"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.749 16C13.682 16 15.249 14.433 15.249 12.5C15.249 10.567 13.682 9 11.749 9C9.81603 9 8.24902 10.567 8.24902 12.5C8.24902 14.433 9.81603 16 11.749 16ZM13.2125 11.8004C13.3784 11.5797 13.334 11.2662 13.1132 11.1003C12.8925 10.9344 12.579 10.9789 12.4131 11.1996L11.4257 12.5134L11.1101 12.0847C10.954 11.8726 10.6554 11.8272 10.4433 11.9833C10.2311 12.1395 10.1857 12.438 10.3419 12.6502L11.0066 13.5532L11.0072 13.554C11.0404 13.6158 11.0873 13.6715 11.147 13.7164C11.3678 13.8823 11.6812 13.8379 11.8471 13.6171L13.2125 11.8004Z"
        fill="#B7B7B7"
      />
    </g>
    <defs>
      <clipPath id="clip0_1058_2145">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(-0.000976562)"
        />
      </clipPath>
    </defs>
  </svg>
)

const LINKS = [
  {
    pathname: '/',
    name: 'Home',
    icon: () => <HomeIcon />,
  },
  {
    pathname: 'https://readinggenius.com/user-dashboard/',
    name: 'Courses',
    icon: () => <CoursesIcon />,
  },
  {
    pathname: '/training-center',
    name: 'Training Center',
    icon: () => <TrainingIcon />,
  },
  {
    pathname: '/profile',
    name: 'Profile',
    icon: () => <ProfileIcon />,
  },
  {
    pathname: '/testing-center',
    name: 'Testing Center',
    icon: () => <TestingIcon />,
  },
]
// const Navigation = observer(() => {
//   const router = useRouter()
//   const [user, setUser] = useState(null)
//   const logout = () => {
//     store.logout()
//   }
//   const login = () => {
//     router.push('/login')
//   }
//   const registration = () => {
//     router.push('/registration')
//   }
//   useEffect(() => {
//     setUser(store.user)
//   }, [store.user])

//   return (
//     <nav className="d-flex align-items-center">
//       {user ? (
//         <>
//           <div className="nav-name">Hello {user.name}</div>

//           <button className="btn btn-secondary ms-auto" onClick={logout}>
//             log out
//           </button>
//         </>
//       ) : (
//         <>
//           <button className="btn btn-secondary" onClick={login}>
//             login
//           </button>
//           <button className="btn btn-secondary ms-3" onClick={registration}>
//             registration
//           </button>
//         </>
//       )}
//     </nav>
//   )
// })
