// AUTO-GENERATED icon registry. Run scripts/gen-icons to refresh.
// Each SVG uses `currentColor`, so <Icon> recolours it via the `color` prop.
import type React from 'react';
import type { SvgProps } from 'react-native-svg';

import AlertCircle from '@/assets/icons/alert-circle.svg';
import AlertTriangle from '@/assets/icons/alert-triangle.svg';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import ArrowLeftRight from '@/assets/icons/arrow-left-right.svg';
import ArrowUp from '@/assets/icons/arrow-up.svg';
import Bell from '@/assets/icons/bell.svg';
import Calendar from '@/assets/icons/calendar.svg';
import Check from '@/assets/icons/check.svg';
import CheckCircle from '@/assets/icons/check-circle.svg';
import ChevronDown from '@/assets/icons/chevron-down.svg';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import Copy from '@/assets/icons/copy.svg';
import Delete from '@/assets/icons/delete.svg';
import Download from '@/assets/icons/download.svg';
import Eye from '@/assets/icons/eye.svg';
import EyeOff from '@/assets/icons/eye-off.svg';
import FileText from '@/assets/icons/file-text.svg';
import Headphones from '@/assets/icons/headphones.svg';
import Home from '@/assets/icons/home.svg';
import IdCard from '@/assets/icons/id-card.svg';
import Info from '@/assets/icons/info.svg';
import Landmark from '@/assets/icons/landmark.svg';
import LayoutGrid from '@/assets/icons/layout-grid.svg';
import Loader from '@/assets/icons/loader.svg';
import MessageSquare from '@/assets/icons/message-square.svg';
import Plus from '@/assets/icons/plus.svg';
import ScanFace from '@/assets/icons/scan-face.svg';
import Search from '@/assets/icons/search.svg';
import ShieldCheck from '@/assets/icons/shield-check.svg';
import Smartphone from '@/assets/icons/smartphone.svg';
import Store from '@/assets/icons/store.svg';
import User from '@/assets/icons/user.svg';
import Wallet from '@/assets/icons/wallet.svg';
import X from '@/assets/icons/x.svg';

export const icons = {
  'alert-circle': AlertCircle,
  'alert-triangle': AlertTriangle,
  'arrow-left': ArrowLeft,
  'arrow-left-right': ArrowLeftRight,
  'arrow-up': ArrowUp,
  'bell': Bell,
  'calendar': Calendar,
  'check': Check,
  'check-circle': CheckCircle,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'copy': Copy,
  'delete': Delete,
  'download': Download,
  'eye': Eye,
  'eye-off': EyeOff,
  'file-text': FileText,
  'headphones': Headphones,
  'home': Home,
  'id-card': IdCard,
  'info': Info,
  'landmark': Landmark,
  'layout-grid': LayoutGrid,
  'loader': Loader,
  'message-square': MessageSquare,
  'plus': Plus,
  'scan-face': ScanFace,
  'search': Search,
  'shield-check': ShieldCheck,
  'smartphone': Smartphone,
  'store': Store,
  'user': User,
  'wallet': Wallet,
  'x': X,
} as const satisfies Record<string, React.FC<SvgProps>>;

export type IconName = keyof typeof icons;
