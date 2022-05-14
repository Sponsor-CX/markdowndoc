curr_level <- "0.0.0.0.0.0.0.0.0"
global_refs <- list()

insert_rmd <- function(file, hidden = FALSE) {
    if (!hidden) {
        cat(file, sep = "\n\n")
    }
}

kchild <- function(child) {
    return(knitr::knit_child(child, quiet = TRUE))
}

get_ordinal <- function(date) {
    day_of_month <- format(date, "%d")
    if (day_of_month == "1") {
        return(paste(day_of_month, "st", sep = ""))
    } else if (day_of_month == "2") {
        return(paste(day_of_month, "nd", sep = ""))
    } else if (day_of_month == "3") {
        return(paste(day_of_month, "rd", sep = ""))
    } else {
        return(paste(day_of_month, "th", sep = ""))
    }
}

get_formatted_date <- function(date) {
    day <- get_ordinal(date)
    month <- format(date, "%B")
    year <- format(date, "%Y")
    return(paste("the ", day, " of ", month, ", ", year, sep = ""))
}

underscores <- function(length = 1) {
    return(paste(rep("\\_", length), collapse = ""))
}

nbsp <- function(length = 1) {
    return(paste(rep("&nbsp;", length), collapse = ""))
}

br <- function(length = 1) {
    return(paste(rep("&nbsp;  \n", length), collapse = ""))
}

substitute <- function(nums, form) {
    matches <- str_extract_all(form, "(?<=%)[a-zA-Z]+")[[1]]

    for (i in seq_len(length(nums))) {
        if (matches[i] == "d") {
            form <- sub("%d", nums[i], form)
        }
        if (matches[i] == "w") {
            form <- sub("%w", letters[as.integer(nums[i])], form)
        }
        if (matches[i] == "W") {
            form <- sub("%W", LETTERS[as.integer(nums[i])], form)
        }
        if (matches[i] == "r") {
            form <- sub("%r", tolower(as.roman(as.integer(nums[i])), form))
        }
        if (matches[i] == "R") {
            form <- sub("%R", as.roman(as.integer(nums[i])), form)
        }
    }
    return (form)
}

format_level <- function(text) {
    nums <- strsplit(text, "\\.")[[1]]

    return(substitute(nums, levels[length(nums)]))
}

single_ref <- function(id) {
    ref <- str_remove(global_refs[[id]], r"{(?=\.0).+}")
    ref <- global_refs[["fees"]]
    return(paste("[", ref, "​](#", id, ")", sep = ""))
}

format_ref <- function(ref) {
    return(gsub(r"{[][\(\)\{\}@#]}", "", ref))
}

ref_section <- c("Section", "Sections")
ref_underline <- FALSE
ref_bold <- FALSE
ref_italic <- FALSE

inc_ref <- function(level, id) {
    id <- format_ref(id)
    nums <- strsplit(curr_level, "\\.")[[1]]
    nums[level] <- as.integer(nums[level]) + 1
    curr_level <- paste(nums, collapse = ".")

    global_refs[[id]] <- curr_level
}

ref <- function(...) {
    ids <- list(...)

    for (id in ids) {
        first_id <- format_ref(ids[[1]])
        id <- format_ref(id)

        if (id == first_id) {
            refs <- paste(single_ref(id), sep = "")
        } else if (id == ids[[length(ids)]] && length(ids) > 1) {
            refs <- paste(refs, " and ", single_ref(id), sep = "")
        } else {
            refs <- paste(refs, ", ", single_ref(id), sep = "")
        }
    }

    section <- ifelse(length(ids) == 1, ref_section[1], ref_section[2])

    content <- paste(section, " ", refs, sep = "")

    if (ref_bold) {
        content <- paste("**", content, "**", sep = "")
    }

    if (ref_italic) {
        content <- paste("*", content, "*", sep = "")
    }

    if (ref_underline) {
        content <- paste("[", content, "]{.underline}", sep = "")
    }

    return(content)
}
