import { type Graph } from '@antv/x6';

export interface InitGraphProps {
  refStencil: HTMLElement;
  x6Container: HTMLElement;
  graph: { value: Graph | null; onChange: (graph: Graph) => void };
}
