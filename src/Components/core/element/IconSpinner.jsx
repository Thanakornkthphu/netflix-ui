import styled from "@emotion/styled";
import { ReactComponent as IconSpinnerSvg } from '../../../Assets/IconSpinner.svg'

export const IconSpinner = styled(IconSpinnerSvg)`
    animation-name: spin;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    width: 65px;
    height: 65px;

    circle {
        stroke: #e2e8ed;
    }
    path {
        stroke: #e2e8f2;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`
