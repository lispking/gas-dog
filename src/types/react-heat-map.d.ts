declare module '@uiw/react-heat-map' {
  import { FC } from 'react';
  
  interface HeatMapProps {
    value: Array<{ date: string; count: number }>;
    startDate?: Date;
    endDate?: Date;
    rectSize?: number;
    rectProps?: object;
    rectRender?: (props: object, data: any) => JSX.Element;
    style?: object;
    legendRender?: (props: object) => JSX.Element | null;
    [key: string]: any;
  }
  
  const HeatMap: FC<HeatMapProps>;
  
  export default HeatMap;
}
