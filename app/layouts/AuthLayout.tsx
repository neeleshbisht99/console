import React from 'react'
import { Outlet } from 'react-router-dom'

const TopLeftDecoration = ({ className = '' }) => {
  return (
    <svg
      width="209"
      height="333"
      viewBox="0 0 209 333"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M181.53 24.8V0.8H193.098V24.8H181.53ZM166.408 24.8V0.8H177.976V24.8H166.408ZM151.285 24.8V0.8H162.853V24.8H151.285ZM136.162 24.8V0.8H147.73V24.8H136.162ZM121.039 24.8V0.8H132.607V24.8H121.039ZM105.916 24.8V0.8H117.484V24.8H105.916ZM90.7935 24.8V0.8H102.362V24.8H90.7935ZM75.6707 24.8V0.8H87.2387V24.8H75.6707ZM60.5479 24.8V0.8H72.1159V24.8H60.5479ZM45.4251 24.8V0.8H56.9931V24.8H45.4251ZM30.3022 24.8V0.8H41.8702V24.8H30.3022ZM15.1794 24.8V0.8H26.7474V24.8H15.1794ZM0.0566244 24.8V0.8H11.6246V24.8H0.0566244ZM196.653 52.8V28.8H208.221V52.8H196.653ZM181.53 52.8V28.8H193.098V52.8H181.53ZM166.408 52.8V28.8H177.976V52.8H166.408ZM151.285 52.8V28.8H162.853V52.8H151.285ZM136.162 52.8V28.8H147.73V52.8H136.162ZM121.039 52.8V28.8H132.607V52.8H121.039ZM105.916 52.8V28.8H117.484V52.8H105.916ZM90.7935 52.8V28.8H102.362V52.8H90.7935ZM75.6707 52.8V28.8H87.2387V52.8H75.6707ZM60.5479 52.8V28.8H72.1159V52.8H60.5479ZM45.4251 52.8V28.8H56.9931V52.8H45.4251ZM30.3022 52.8V28.8H41.8702V52.8H30.3022ZM39.9982 30.672H32.1742V50.928H39.9982V30.672ZM15.1794 52.8V28.8H26.7474V52.8H15.1794ZM24.8754 30.672H17.0514V50.928H24.8754V30.672ZM0.0566244 52.8V28.8H11.6246V52.8H0.0566244ZM9.75262 30.672H1.92862V50.928H9.75262V30.672ZM181.53 80.8V56.8H193.098V80.8H181.53ZM166.408 80.8V56.8H177.976V80.8H166.408ZM151.285 80.8V56.8H162.853V80.8H151.285ZM136.162 80.8V56.8H147.73V80.8H136.162ZM121.039 80.8V56.8H132.607V80.8H121.039ZM105.916 80.8V56.8H117.484V80.8H105.916ZM90.7935 80.8V56.8H102.362V80.8H90.7935ZM75.6707 80.8V56.8H87.2387V80.8H75.6707ZM60.5479 80.8V56.8H72.1159V80.8H60.5479ZM45.4251 80.8V56.8H56.9931V80.8H45.4251ZM30.3022 80.8V56.8H41.8702V80.8H30.3022ZM39.9982 58.672H32.1742V78.928H39.9982V58.672ZM15.1794 80.8V56.8H26.7474V80.8H15.1794ZM24.8754 58.672H17.0514V78.928H24.8754V58.672ZM0.0566244 80.8V56.8H11.6246V80.8H0.0566244ZM9.75262 58.672H1.92862V78.928H9.75262V58.672ZM121.039 108.8V84.8H132.607V108.8H121.039ZM105.916 108.8V84.8H117.484V108.8H105.916ZM90.7935 108.8V84.8H102.362V108.8H90.7935ZM75.6707 108.8V84.8H87.2387V108.8H75.6707ZM60.5479 108.8V84.8H72.1159V108.8H60.5479ZM45.4251 108.8V84.8H56.9931V108.8H45.4251ZM30.3022 108.8V84.8H41.8702V108.8H30.3022ZM15.1794 108.8V84.8H26.7474V108.8H15.1794ZM105.916 136.8V112.8H117.484V136.8H105.916ZM90.7935 136.8V112.8H102.362V136.8H90.7935ZM75.6707 136.8V112.8H87.2387V136.8H75.6707ZM30.3022 136.8V112.8H41.8702V136.8H30.3022ZM15.1794 136.8V112.8H26.7474V136.8H15.1794ZM105.916 164.8V140.8H117.484V164.8H105.916ZM90.7935 164.8V140.8H102.362V164.8H90.7935ZM75.6707 164.8V140.8H87.2387V164.8H75.6707ZM60.5479 164.8V140.8H72.1159V164.8H60.5479ZM45.4251 164.8V140.8H56.9931V164.8H45.4251ZM30.3022 164.8V140.8H41.8702V164.8H30.3022ZM15.1794 164.8V140.8H26.7474V164.8H15.1794ZM105.916 192.8V168.8H117.484V192.8H105.916ZM90.7935 192.8V168.8H102.362V192.8H90.7935ZM75.6707 192.8V168.8H87.2387V192.8H75.6707ZM60.5479 192.8V168.8H72.1159V192.8H60.5479ZM45.4251 192.8V168.8H56.9931V192.8H45.4251ZM30.3022 192.8V168.8H41.8702V192.8H30.3022ZM15.1794 192.8V168.8H26.7474V192.8H15.1794ZM105.916 220.8V196.8H117.484V220.8H105.916ZM90.7935 220.8V196.8H102.362V220.8H90.7935ZM75.6707 220.8V196.8H87.2387V220.8H75.6707ZM60.5479 220.8V196.8H72.1159V220.8H60.5479ZM45.4251 220.8V196.8H56.9931V220.8H45.4251ZM30.3022 220.8V196.8H41.8702V220.8H30.3022ZM15.1794 220.8V196.8H26.7474V220.8H15.1794ZM105.916 248.8V224.8H117.484V248.8H105.916ZM90.7935 248.8V224.8H102.362V248.8H90.7935ZM75.6707 248.8V224.8H87.2387V248.8H75.6707ZM60.5479 248.8V224.8H72.1159V248.8H60.5479ZM45.4251 248.8V224.8H56.9931V248.8H45.4251ZM30.3022 248.8V224.8H41.8702V248.8H30.3022ZM15.1794 248.8V224.8H26.7474V248.8H15.1794ZM151.285 276.8V252.8H162.853V276.8H151.285ZM136.162 276.8V252.8H147.73V276.8H136.162ZM121.039 276.8V252.8H132.607V276.8H121.039ZM105.916 276.8V252.8H117.484V276.8H105.916ZM45.4251 276.8V252.8H56.9931V276.8H45.4251ZM30.3022 276.8V252.8H41.8702V276.8H30.3022ZM15.1794 276.8V252.8H26.7474V276.8H15.1794ZM0.0566244 276.8V252.8H11.6246V276.8H0.0566244ZM151.285 304.8V280.8H162.853V304.8H151.285ZM136.162 304.8V280.8H147.73V304.8H136.162ZM121.039 304.8V280.8H132.607V304.8H121.039ZM105.916 304.8V280.8H117.484V304.8H105.916ZM90.7935 304.8V280.8H102.362V304.8H90.7935ZM75.6707 304.8V280.8H87.2387V304.8H75.6707ZM60.5479 304.8V280.8H72.1159V304.8H60.5479ZM45.4251 304.8V280.8H56.9931V304.8H45.4251ZM30.3022 304.8V280.8H41.8702V304.8H30.3022ZM15.1794 304.8V280.8H26.7474V304.8H15.1794ZM0.0566244 304.8V280.8H11.6246V304.8H0.0566244ZM121.039 332.8V308.8H132.607V332.8H121.039ZM105.916 332.8V308.8H117.484V332.8H105.916ZM90.7935 332.8V308.8H102.362V332.8H90.7935ZM75.6707 332.8V308.8H87.2387V332.8H75.6707ZM60.5479 332.8V308.8H72.1159V332.8H60.5479ZM45.4251 332.8V308.8H56.9931V332.8H45.4251ZM30.3022 332.8V308.8H41.8702V332.8H30.3022ZM15.1794 332.8V308.8H26.7474V332.8H15.1794ZM0.0566244 332.8V308.8H11.6246V332.8H0.0566244Z"
        fill="rgb(var(--content-secondary-rgb), 0.25)"
      />
    </svg>
  )
}

const BottomRightDecoration = ({ className = '' }) => {
  return (
    <svg
      width="270"
      height="165"
      viewBox="0 0 270 165"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M257.776 24.8V0.8H269.344V24.8H257.776ZM242.653 24.8V0.8H254.221V24.8H242.653ZM227.53 24.8V0.8H239.098V24.8H227.53ZM212.408 24.8V0.8H223.976V24.8H212.408ZM197.285 24.8V0.8H208.853V24.8H197.285ZM182.162 24.8V0.8H193.73V24.8H182.162ZM167.039 24.8V0.8H178.607V24.8H167.039ZM61.1794 24.8V0.8H72.7474V24.8H61.1794ZM70.8754 2.672H63.0514V22.928H70.8754V2.672ZM46.0566 24.8V0.8H57.6246V24.8H46.0566ZM55.7526 2.672H47.9286V22.928H55.7526V2.672ZM30.9338 24.8V0.8H42.5018V24.8H30.9338ZM40.6298 2.672H32.8058V22.928H40.6298V2.672ZM15.811 24.8V0.8H27.379V24.8H15.811ZM25.507 2.672H17.683V22.928H25.507V2.672ZM0.688201 24.8V0.8H12.2562V24.8H0.688201ZM10.3842 2.672H2.5602V22.928H10.3842V2.672ZM257.776 52.8V28.8H269.344V52.8H257.776ZM242.653 52.8V28.8H254.221V52.8H242.653ZM227.53 52.8V28.8H239.098V52.8H227.53ZM212.408 52.8V28.8H223.976V52.8H212.408ZM197.285 52.8V28.8H208.853V52.8H197.285ZM182.162 52.8V28.8H193.73V52.8H182.162ZM167.039 52.8V28.8H178.607V52.8H167.039ZM61.1794 52.8V28.8H72.7474V52.8H61.1794ZM70.8754 30.672H63.0514V50.928H70.8754V30.672ZM46.0566 52.8V28.8H57.6246V52.8H46.0566ZM55.7526 30.672H47.9286V50.928H55.7526V30.672ZM30.9338 52.8V28.8H42.5018V52.8H30.9338ZM40.6298 30.672H32.8058V50.928H40.6298V30.672ZM15.811 52.8V28.8H27.379V52.8H15.811ZM25.507 30.672H17.683V50.928H25.507V30.672ZM0.688201 52.8V28.8H12.2562V52.8H0.688201ZM10.3842 30.672H2.5602V50.928H10.3842V30.672ZM257.776 80.8V56.8H269.344V80.8H257.776ZM242.653 80.8V56.8H254.221V80.8H242.653ZM227.53 80.8V56.8H239.098V80.8H227.53ZM212.408 80.8V56.8H223.976V80.8H212.408ZM197.285 80.8V56.8H208.853V80.8H197.285ZM182.162 80.8V56.8H193.73V80.8H182.162ZM167.039 80.8V56.8H178.607V80.8H167.039ZM61.1794 80.8V56.8H72.7474V80.8H61.1794ZM46.0566 80.8V56.8H57.6246V80.8H46.0566ZM30.9338 80.8V56.8H42.5018V80.8H30.9338ZM15.811 80.8V56.8H27.379V80.8H15.811ZM0.688201 80.8V56.8H12.2562V80.8H0.688201ZM257.776 108.8V84.8H269.344V108.8H257.776ZM242.653 108.8V84.8H254.221V108.8H242.653ZM227.53 108.8V84.8H239.098V108.8H227.53ZM212.408 108.8V84.8H223.976V108.8H212.408ZM197.285 108.8V84.8H208.853V108.8H197.285ZM182.162 108.8V84.8H193.73V108.8H182.162ZM167.039 108.8V84.8H178.607V108.8H167.039ZM61.1794 108.8V84.8H72.7474V108.8H61.1794ZM46.0566 108.8V84.8H57.6246V108.8H46.0566ZM30.9338 108.8V84.8H42.5018V108.8H30.9338ZM15.811 108.8V84.8H27.379V108.8H15.811ZM0.688201 108.8V84.8H12.2562V108.8H0.688201ZM257.776 136.8V112.8H269.344V136.8H257.776ZM242.653 136.8V112.8H254.221V136.8H242.653ZM227.53 136.8V112.8H239.098V136.8H227.53ZM212.408 136.8V112.8H223.976V136.8H212.408ZM151.916 136.8V112.8H163.484V136.8H151.916ZM136.794 136.8V112.8H148.362V136.8H136.794ZM121.671 136.8V112.8H133.239V136.8H121.671ZM106.548 136.8V112.8H118.116V136.8H106.548ZM257.776 164.8V140.8H269.344V164.8H257.776ZM242.653 164.8V140.8H254.221V164.8H242.653ZM227.53 164.8V140.8H239.098V164.8H227.53ZM212.408 164.8V140.8H223.976V164.8H212.408ZM197.285 164.8V140.8H208.853V164.8H197.285ZM182.162 164.8V140.8H193.73V164.8H182.162ZM167.039 164.8V140.8H178.607V164.8H167.039ZM151.916 164.8V140.8H163.484V164.8H151.916ZM136.794 164.8V140.8H148.362V164.8H136.794ZM121.671 164.8V140.8H133.239V164.8H121.671ZM106.548 164.8V140.8H118.116V164.8H106.548Z"
        fill="rgb(var(--content-secondary-rgb), 0.25)"
      />
    </svg>
  )
}

const Logo = ({ className = '' }) => {
  return (
    <svg
      width="50"
      height="34"
      viewBox="0 0 50 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.2889 18.0777V15.2277C23.2889 5.99644 19.3831 0 11.6236 0C3.90575 0 0 5.99644 0 15.2277V18.0777C0 27.309 3.90575 33.3003 11.6444 33.3055C19.3831 33.3055 23.2889 27.309 23.2889 18.0777ZM4.42062 22.644C4.15538 21.297 4.02017 19.768 4.02017 18.0777V15.2277C4.02017 7.71788 6.68294 3.48969 11.6444 3.48969C14.6765 3.48969 16.84 5.07071 18.0673 8.00912L4.42062 22.644ZM18.9359 11.1296C19.1439 12.3569 19.2479 13.7299 19.2479 15.2277V18.0725C19.2479 25.5824 16.6059 29.8106 11.6444 29.8106C8.74243 29.8106 6.63093 28.37 5.37236 25.6708L18.9359 11.1296ZM47.6543 9.62656C47.5398 9.53295 47.3578 9.53295 47.2642 9.64737L39.0419 18.5146L30.7987 9.64737C30.7051 9.53295 30.5231 9.53295 30.4086 9.62656L28.1567 11.7381C28.0423 11.8317 28.0423 12.0137 28.1359 12.1281L36.5871 21.1306L28.1359 30.133C28.0423 30.2475 28.0423 30.4295 28.1567 30.5231L30.4086 32.6346C30.5231 32.7282 30.7051 32.7282 30.7987 32.6138L39.0419 23.7465L47.2694 32.6138C47.363 32.7282 47.5451 32.7282 47.6595 32.6346L49.9114 30.5231C50.0258 30.4295 50.0258 30.2475 49.9322 30.133L41.481 21.1306L49.927 12.1281C50.0206 12.0137 50.0206 11.8317 49.9062 11.7381L47.6543 9.62656Z"
        fill="var(--theme-accent-1)"
      />
    </svg>
  )
}

const AuthLayout = () => {
  return (
    <main className="relative h-screen">
      <TopLeftDecoration className="absolute top-5 left-5" />
      <BottomRightDecoration className="absolute bottom-5 right-5" />
      <Logo className="absolute bottom-5 left-5" />
      <div className="z-10 flex h-full items-center justify-center children:relative children:rounded children:py-2 children:px-4">
        <Outlet />
      </div>
    </main>
  )
}

export default AuthLayout