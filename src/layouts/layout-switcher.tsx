'use client';

import { RadioGroup } from 'rizzui';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import RadioBox from '@/layouts/settings/radio-box';
import DrawerBlock from '@/layouts/settings/drawer-block';
import HydrogenIcon from './hydrogen-icon';
import HeliumIcon from './helium-icon';
import LithiumIcon from './lithium-icon';
import BerylliumIcon from './beryllium-icon';
import BoronIcon from './boron-icon';
import CarbonIcon from './carbon-icon';

const layoutOptions = [
  {
    icon: HydrogenIcon,
    value: LAYOUT_OPTIONS.CARBON,
  },
  {
    icon: HeliumIcon,
    value: LAYOUT_OPTIONS.CARBON,
  },
  {
    icon: LithiumIcon,
    value: LAYOUT_OPTIONS.CARBON,
  },
  {
    icon: BerylliumIcon,
    value: LAYOUT_OPTIONS.CARBON,
  },
  {
    icon: BoronIcon,
    value: LAYOUT_OPTIONS.CARBON,
  },
  {
    icon: CarbonIcon,
    value: LAYOUT_OPTIONS.CARBON,
  },
];

export default function LayoutSwitcher() {
  const { layout, setLayout } = useLayout();

  return (
    <DrawerBlock title="">
      <RadioGroup
        value={layout}
        setValue={(selectedLayout: any) => setLayout(selectedLayout)}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3"
      >
        {layoutOptions.map((item) => (
          <RadioBox
            key={item.value}
            value={item.value}
            className="h-auto"
            contentClassName="p-0 [&_.radio-active]:ring-primary/0 peer-checked:ring-0 border-0 ring-0 peer-checked:border-0 peer-checked:[&_.radio-active]:ring-primary/100 [&_.radio-active]:ring-2 peer-checked:text-primary"
          >
            <span className="flex w-full justify-center">
              <span className="radio-active mb-3 inline-flex justify-center rounded-lg capitalize ring-offset-4 ring-offset-gray-0 duration-150 dark:ring-offset-gray-100">
                <item.icon
                  aria-label={item.value}
                  className="h-[92px] w-full"
                />
              </span>
            </span>{' '}
            <span className="inline-block w-full text-center">
              {item.value}
            </span>
          </RadioBox>
        ))}
      </RadioGroup>
    </DrawerBlock>
  );
}
