import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip"
import { IconQuestionCircle } from "@/lib/icons"

const DescriptionMatrix = ({description}: {description : string} ) => {
  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger><IconQuestionCircle /></TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}

export default DescriptionMatrix